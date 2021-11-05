namespace SlaveAPI.Data
{
    using Microsoft.EntityFrameworkCore;
    using SlaveAPI.Models;

    public class SlaveAPIContext : DbContext
    {
        public SlaveAPIContext(DbContextOptions<SlaveAPIContext> opt) : base(opt)
        {

        }

        public DbSet<Vulnerability> Vulnerabilities { get; set; }
    }
}