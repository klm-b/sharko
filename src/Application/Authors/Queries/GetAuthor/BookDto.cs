using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Application.Authors.Queries.GetAuthor
{
    public class BookDto : IMapFrom<Book>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }

        public IList<string> Tags { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Book, BookDto>()
                .ForMember(d => d.Tags, opt => opt.MapFrom(s => s.Tags.Select(t => t.Name)));
        }
    }
}
