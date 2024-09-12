using CRUDModal1.Models;
using CRUDModal1.Models.Dto;

namespace CRUDModal1.Repository.IRepository
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProducts();
        Task AddProducts(AddProductDto model);
        Task<ProductDetailsDto> GetProductDetailsAsync(int id);
        Task<bool> UpdateProductAsync(ProductDetailsDto model);
        Task DeleteProductByIdAsync(int id);
    }
}
