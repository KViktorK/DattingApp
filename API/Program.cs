using API.Authorization;
using API.Data;
using API.Data.Repositories;
using API.Helpers;
using API.Interface;
using API.Services;
using Microsoft.EntityFrameworkCore;
namespace API;
class Program
{
    static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var services = builder.Services;
        string connection = builder.Configuration.GetConnectionString("DefaultConnection");

        // Add services to the container.

        services.AddControllers();
        services.AddDbContext<DBContext>(options =>
        {
            options.UseSqlServer(connection);
        });

        services.AddAutoMapper(typeof(Program).Assembly);
        services.AddCors();
        services.AddAuthentication();
        services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

        // configure DI for application services
        services.AddScoped<IJwtUtils, JwtUtils>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IAuthService, AuthService>();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddHttpClient();


        var app = builder.Build();

        // Configure the HTTP request pipeline.
        {
            using (var scope = app.Services.CreateScope())
            {
                try
                {
                    var dataContext = scope.ServiceProvider.GetRequiredService<DBContext>();
                    await dataContext.Database.MigrateAsync();
                }
                catch (Exception ex)
                {
                    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "error");
                }
            }
        }
        //services.AddTransient<DataSeed>();
        app.UseSwagger();
        app.UseSwaggerUI();

        app.UseMiddleware<ErrorHandlerWiddleware>();
        app.UseMiddleware<JwtMiddleware>();

        app.UseHttpsRedirection();

        app.UseRouting();
        app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());


        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();


    }
}
