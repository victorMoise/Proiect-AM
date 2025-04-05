using backend.Queries.User;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserDetails()
        {
            var result = await _mediator.Send(new GetUserDetails.Query());
            return Ok(result);
        }

        [HttpGet("address")]
        public async Task<IActionResult> GetUserAddress()
        {
            var result = await _mediator.Send(new GetUserAddress.Query());
            return Ok(result);
        }   

        [HttpGet("countries")]
        public async Task<IActionResult> GetCountries([FromRoute] GetCountries.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("cities")]
        public async Task<IActionResult> GetCities([FromQuery] GetCities.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserDetails([FromBody] SaveUser.Query command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpPut("address")]
        public async Task<IActionResult> UpdateUserAddress([FromBody] SaveUserAddress.Query command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }
    }
}
