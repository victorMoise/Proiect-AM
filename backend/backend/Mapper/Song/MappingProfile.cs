using AutoMapper;
using backend.Models;
using backend.Queries.Songs;
using E = backend.Entities;

namespace backend.Mapper.Song
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<E.Song, SongModel>()
                .ForMember(dest => dest.Artist, opt => opt.MapFrom(src => src.Artist.Name))
                .ForMember(dest => dest.Genre, opt => opt.MapFrom(src => src.Genre.Name))
                .ForMember(dest => dest.Duration, opt => opt.MapFrom(src => GetFormattedDuration(src.Duration)));

            CreateMap<E.Artist, GetArtists.Model>();
            CreateMap<E.Genre, GetGenres.Model>();
        }

        private string GetFormattedDuration(int durationInSeconds)
        {
            int minutes = durationInSeconds / 60;
            int seconds = durationInSeconds % 60;
            return $"{minutes:D2}:{seconds:D2}";
        }
    }
}
