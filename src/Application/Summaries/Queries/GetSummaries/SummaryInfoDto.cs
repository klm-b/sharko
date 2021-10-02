using Application.Books.Queries.GetBooks;
using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Application.Summaries.Queries.GetSummary;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Sharko.Application.Summaries.Queries.GetSummaries
{
    public class SummaryInfoDto : IMapFrom<Summary>
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public int ChaptersNumber { get; set; }
        public string About { get; set; }
        public string Creator { get; set; }
        public DateTime CreatedAt { get; set; }

        public BookDto Book { get; set; }

        public IList<LabelDto> Labels { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Summary, SummaryInfoDto>()
                .ForMember(d => d.Labels, opt => opt.Ignore())
                .ForMember(d => d.Creator, opt => opt.MapFrom(s => s.Creator.UserName));
        }
    }
}
