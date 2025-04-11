using backend.Queries.Songs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SongsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SongsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("public/list")]
        public async Task<IActionResult> GetPublicSongsList()
        {
            var result = await _mediator.Send(new GetPublicSongsList.Query());
            return Ok(result);
        }

        [HttpGet("play/{id}")]
        public async Task<IActionResult> GetSongStream(int id)
        {
            var query = new GetSongStream.Query { Id = id };
            var result = await _mediator.Send(query);

            return result;
        }
    }
}
