using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;

namespace Application.Books.Queries.GetBooks
{
    public class BookDto : IMapFrom<Book>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //  public string EngName { get; set; }
        public int Rating { get; set; }
        public string Image { get; set; }
        // public string About { get; set; }

        public IList<string> Tags { get; set; }
        // public IList<string> ISBNs { get; set; }
        public IList<AuthorDto> Authors { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Book, BookDto>()
                // .ForMember(d => d.ISBNs, opt => opt.MapFrom(s => s.ISBNs.Select(i => i.Value)))
                .ForMember(d => d.Tags, opt => opt.MapFrom(s => s.Tags.Select(t => t.Name)));
        }
    }
}