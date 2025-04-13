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

        [HttpPost]
        public async Task<IActionResult> SaveSong([FromForm] IFormCollection formData)
        {
            var file = formData.Files.GetFile("File");
            var title = formData["Title"];
            var isPublic = formData["IsPublic"] == "yes";
            var artistId = formData.ContainsKey("ArtistId") && !string.IsNullOrEmpty(formData["ArtistId"]) ?
                           (int?)int.Parse(formData["ArtistId"]) : null;
            var genreId = formData.ContainsKey("GenreId") && !string.IsNullOrEmpty(formData["GenreId"]) ?
                          (int?)int.Parse(formData["GenreId"]) : null;
            var newArtistName = formData["NewArtistName"];
            var newGenreName = formData["NewGenreName"];

            var query = new SaveSong.Query
            {
                File = file,
                Title = title,
                IsPublic = isPublic,
                ArtistId = artistId,
                GenreId = genreId,
                NewArtistName = newArtistName,
                NewGenreName = newGenreName
            };

            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("artists")]
        public async Task<IActionResult> GetArtists()
        {
            var result = await _mediator.Send(new GetArtists.Query());
            return Ok(result);
        }

        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            var result = await _mediator.Send(new GetGenres.Query());
            return Ok(result);
        }

        [HttpPut("favorite")]
        public async Task<IActionResult> FavoriteSong([FromQuery] FavoriteSong.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPut("unfavorite")]
        public async Task<IActionResult> UnfavoriteSong([FromQuery] UnfavoriteSong.Query query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
