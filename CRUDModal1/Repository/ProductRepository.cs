using CRUDModal1.Data;
using CRUDModal1.Models;
using CRUDModal1.Models.Dto;
using CRUDModal1.Repository.IRepository;
using Microsoft.EntityFrameworkCore;

namespace CRUDModal1.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _data;

        public ProductRepository(DataContext data)
        {
            _data = data;
        }

        public async Task AddProducts(AddProductDto model)
        {
            var product = new Product
            {
                ProductName = model.ProductName,
                Price = model.Price,
                Qty = model.Qty
            };

            _data.Add(product);
            await _data.SaveChangesAsync();
        }

        public async Task DeleteProductByIdAsync(int id)
        {
            var product = await _data.Products.FindAsync(id);
            if (product == null)
            {
                throw new KeyNotFoundException("Product not found");
            }

            _data.Products.Remove(product);
            await _data.SaveChangesAsync();
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _data.Products.ToListAsync();
        }

        public async Task<ProductDetailsDto> GetProductDetailsAsync(int id)
        {
            return await _data.Products
                .Where(p => p.ProductId == id)
                .Select(p => new ProductDetailsDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Price = p.Price,
                    Qty = p.Qty
                }).FirstOrDefaultAsync();

        }

        public async Task<bool> UpdateProductAsync(ProductDetailsDto model)
        {
            // Fetch product by id
            var product = await _data.Products.FindAsync(model.ProductId);

            product.ProductName = model.ProductName;
            product.Price = model.Price;
            product.Qty = model.Qty;

            await _data.SaveChangesAsync();
            return true;
        }
    }
}
