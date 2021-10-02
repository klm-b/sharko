using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;

namespace Application.Books.Queries.GetBooks
{
    public class AuthorDto : IMapFrom<Author>
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Author, AuthorDto>()
                .ForMember(d => d.Name, opt => opt.MapFrom(s => $"{s.FirstName} {s.LastName}"));
        }
    }
}