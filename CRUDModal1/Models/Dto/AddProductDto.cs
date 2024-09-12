namespace CRUDModal1.Models.Dto
{
    public class AddProductDto
    {
        public required string ProductName { get; set; }
        public required double Price { get; set; }
        public required int Qty { get; set; }
    }
}
