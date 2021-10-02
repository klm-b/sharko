using Application.Books.Queries.GetBooks;
using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sharko.Application.Books.Queries.GetBookInfo
{
    public class SummaryInfoDto : IMapFrom<Summary>
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public int ChaptersNumber { get; set; }
        public string About { get; set; }
        public string Creator { get; set; }
        public DateTime CreatedAt { get; set; }

        public IList<string> Labels { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Summary, SummaryInfoDto>()
                .ForMember(d => d.Labels, opt => opt.MapFrom(o => o.Labels.Select(l => l.Name)))
                .ForMember(d => d.Creator, opt => opt.MapFrom(s => s.Creator.UserName));
        }
    }
}
