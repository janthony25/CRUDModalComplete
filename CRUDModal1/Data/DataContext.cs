using CRUDModal1.Models;
using Microsoft.EntityFrameworkCore;

namespace CRUDModal1.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Product> Products { get; set; }
    }
}
