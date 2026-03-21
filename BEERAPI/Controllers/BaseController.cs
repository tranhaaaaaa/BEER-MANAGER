using BEERAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Routing.Controllers;
using System.Reflection;
namespace BEERAPI.Controllers
{
    //[Authorize]
    public class BaseController<T> : ODataController where T : class
    {
        private IServices<T> _service;
        public BaseController(IServices<T> service)
        {
            _service = service;
        }
        [HttpGet]
        [EnableQuery(PageSize = 100)]
        public async Task<IActionResult> Get()
        {
            var query = await Task.FromResult(_service.GetAll());

            return Ok(new ApiResponse<object>
            {
                Status = 200,
                IsSuccess = true,
                Data = query
            });
        }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get([FromODataUri] Guid key)
        {
            var query = await _service.GetSingleAsync(key);

            return Ok(new ApiResponse<object>
            {
                Status = 200,
                IsSuccess = true,
                Data = SingleResult.Create(query)
            });
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] T entity)
        {
            await _service.CreateAsync(entity);

            return Ok(new ApiResponse<T>
            {
                Status = 201,
                IsSuccess = true,
                Data = entity
            });
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromODataUri] Guid key, [FromBody] Delta<T> entity)
        {
            var original = await _service.GetObjectAsync(key);
            if (original == null)
                return NotFound(new ApiResponse<object>
                {
                    Status = 404,
                    IsSuccess = false,
                    Data = null
                });

            entity.Put(original);
            await _service.UpdateAsync(original);

            return Ok(new ApiResponse<T>
            {
                Status = 200,
                IsSuccess = true,
                Data = original
            });
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromODataUri] Guid key, [FromBody] Delta<T> entity)
        {
            var original = await _service.GetObjectAsync(key);

            if (original == null)
                return NotFound(new ApiResponse<object>
                {
                    Status = 404,
                    IsSuccess = false
                });

            entity.Patch(original);
            await _service.UpdateAsync(original);

            return Ok(new ApiResponse<T>
            {
                Status = 200,
                IsSuccess = true,
                Data = original
            });
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromODataUri] Guid key)
        {
            var original = await _service.GetObjectAsync(key);

            if (original == null)
                return NotFound(new ApiResponse<object>
                {
                    Status = 404,
                    IsSuccess = false
                });

            await _service.DeleteAsync(original);

            return Ok(new ApiResponse<object>
            {
                Status = 200,
                IsSuccess = true
            });
        }
    }


}
