using Application.Books.Queries.GetBooks;
using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sharko.Application.Books.Queries.GetBookInfo
{
    public class BookInfoDto : IMapFrom<Book>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //  public string EngName { get; set; }
        public int Rating { get; set; }
        public string Image { get; set; }
        public string About { get; set; }

        public IList<string> Tags { get; set; }
        public IList<string> Categories { get; set; }
        [JsonPropertyName("isbns")]
        public IList<string> ISBNs { get; set; }
        public IList<AuthorDto> Authors { get; set; }
        public IList<SummaryInfoDto> Summaries { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Book, BookInfoDto>()
                .ForMember(d => d.Authors, opt => opt.MapFrom(o => o.Authors))
                .ForMember(d => d.ISBNs, opt => opt.MapFrom(o => o.ISBNs.Select(t => t.Value)))
                .ForMember(d => d.Summaries, opt => opt.MapFrom(o => o.Summaries))
                .ForMember(d => d.Categories, opt => opt.MapFrom(o => o.Categories.Select(t => t.Name)))
                .ForMember(d => d.Tags, opt => opt.MapFrom(o => o.Tags.Select(t => t.Name)));
        }
    }
}
