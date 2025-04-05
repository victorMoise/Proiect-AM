using backend.Queries.Test;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly IMediator _mediator;

        public TestController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("connection")]
        public async Task<IActionResult> TestConnection()
        {
            var result = await _mediator.Send(new GetConnection.Query());
            return Ok(result);
        }
    }
}