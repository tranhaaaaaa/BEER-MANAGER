using BEERAPI.Models;
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
            return Ok(_service.GetAll());
        }

        [HttpGet]
        [EnableQuery]
        public async Task<IActionResult> Get([FromODataUri] Guid key)
        {
            var response = await _service.GetObjectAsync(key);
            if(response == null)
            {
                return Content("Not found");
            }
            return Ok(response);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] T entity)
        {
            var response = await _service.CreateAsync(entity);

            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromODataUri] Guid key, [FromBody] Delta<T> entity)
        {
            var response = await _service.UpdateAsync(key, entity);

            return Ok(response);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromODataUri] Guid key, [FromBody] Delta<T> entity)
        {
            var response = await _service.PatchAsync(key, entity);

            return Ok(response);
        }
        [HttpDelete]
        public async Task<IActionResult> Delete([FromODataUri] Guid key)
        {
            var response = await _service.DeleteAsync(key);

            return Ok(response);
        }
    }
}