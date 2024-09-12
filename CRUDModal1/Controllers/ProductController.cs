using CRUDModal1.Models;
using CRUDModal1.Models.Dto;
using CRUDModal1.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace CRUDModal1.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductRepository _productRepository;

        public ProductController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetProducts()
        {
            var products = await _productRepository.GetAllProducts();
            return Json(products);
        }

        
        // POST: Add Product
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Insert(AddProductDto model)
        {
            if (ModelState.IsValid)
            {
                await _productRepository.AddProducts(model);
                return Json("Product details added.");
            }
            else
            {
                return Json("Model validation failed.");
            }
        }

        // GET: Edit Product Details
        public async Task<IActionResult> Edit(int id)
        {
            var product = await _productRepository.GetProductDetailsAsync(id);

            if(product != null)
            {
                return Json(product);
            }
            return Json("Invalid Id");
            
        }

        // GET: Modal show for delete
        public async Task<IActionResult> DeleteModal(int id)
        {
            var product = await _productRepository.GetProductDetailsAsync(id);

            if (product != null)
            {
                return Json(product);
            }
            return Json("Invalid Id");
        }

        // POST: Edit Product
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(ProductDetailsDto model)
        {
            if(ModelState.IsValid)
            {
                await _productRepository.UpdateProductAsync(model);
                return Json("Product updated.");
            }
            return Json("Unable to update product");
        }

        // POST: Delete Product
        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _productRepository.DeleteProductByIdAsync(id);
                return Json("Product successfully deleted.");
            }
            catch (KeyNotFoundException ex)
            {
                return Json("Inavlid product id.");
            }
        }

    }
}
