using System.ComponentModel;

namespace CRUDModal1.Models.Dto
{
    public class ProductDetailsDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double Price { get; set; }
        public int Qty { get; set; }
    }
}
