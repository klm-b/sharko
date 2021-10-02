using Application.Books.Queries.GetBooks;
using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sharko.Application.Summaries.Queries.GetSummary
{
    public class SummaryDto : IMapFrom<Summary>
    {
        public int Id { get; set; }
        public int Rating { get; set; }
        public int BookId { get; set; }
        public string About { get; set; }
        public string Creator { get; set; }
        public DateTime CreatedAt { get; set; }

        public IList<LabelDto> Labels { get; set; }
        public IList<ChapterDto> Chapters { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Summary, SummaryDto>()
                .ForMember(d => d.Labels, opt => opt.Ignore())
                .ForMember(d => d.Chapters, opt => opt.Ignore())
                .ForMember(d => d.Creator, opt => opt.MapFrom(s => s.Creator.UserName));
        }
    }
}