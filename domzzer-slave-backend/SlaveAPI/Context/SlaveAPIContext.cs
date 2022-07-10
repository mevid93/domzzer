using Microsoft.EntityFrameworkCore;
using SlaveAPI.Models;

namespace SlaveAPI.Context
{
    public class SlaveAPIContext : DbContext
    {
        public SlaveAPIContext() { }

        public SlaveAPIContext(DbContextOptions<SlaveAPIContext> opt) : base(opt) { }

        public DbSet<Vulnerability> Vulnerabilities { get; set; }
    }
}