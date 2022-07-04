using API.Authorization;
using API.Data;
using API.Helpers;
using API.Middleware;
using API.Services;
using Microsoft.EntityFrameworkCore;


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
services.AddScoped<JwtUtils>();
services.AddScoped<UserService>();

//builder.Services.AddScoped<ITokenService, TokenService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DBContext>();
    dataContext.Database.Migrate();
}

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
