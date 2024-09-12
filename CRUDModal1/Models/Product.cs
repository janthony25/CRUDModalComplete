using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace CRUDModal1.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [DisplayName("Product Name")]
        public required string ProductName { get; set; }
        public required double Price { get; set; }
        public required int Qty { get; set; }
    }
}
