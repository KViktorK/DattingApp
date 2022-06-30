namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //Hash
        public byte[] PasswordH { get; set; }
        //Salt
        public byte[] PassworedS { get; set; }
    }
}