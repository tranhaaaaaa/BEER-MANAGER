using BEERAPI.Services;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using Microsoft.AspNetCore.OData.Deltas;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Results;
using Microsoft.AspNetCore.OData.Routing.Controllers;
namespace BEERAPI.Controllers
{
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
            return Ok(query);
        }

        [HttpGet]
        [EnableQuery()]
        public async Task<IActionResult> Get([FromODataUri] Guid key)
        {
            var query = await _service.GetSingleAsync(key);
            return Ok(SingleResult.Create(query));
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] T entity)
        {

            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            await _service.CreateAsync(entity);
            return Created(entity);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromODataUri] Guid key, [FromBody] Delta<T> entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var original = await _service.GetObjectAsync(key);
            if (original == null)
                return NotFound();

            entity.Put(original);
            await _service.UpdateAsync(original);
            return Updated(original);
        }

        [HttpPatch]
        public async Task<IActionResult> Patch([FromODataUri] Guid key, [FromBody] Delta<T> entity)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var original = await _service.GetObjectAsync(key);
            if (original == null)
                return NotFound();
            entity.Patch(original);
            await _service.UpdateAsync(original);
            return Updated(original);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromODataUri] Guid key)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var original = await _service.GetObjectAsync(key);
            if (original == null)
                return NotFound();
            await _service.DeleteAsync(original);
            return Ok();
        }
    }


}
