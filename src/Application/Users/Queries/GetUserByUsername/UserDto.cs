using AutoMapper;
using Sharko.Application.Common.Mappings;
using Sharko.Application.Summaries.Queries.GetChapter;
using Sharko.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IO;

namespace Sharko.Application.Users.Queries.GetUserByUsername
{
    public class UserDto : IMapFrom<Person>
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Picture { get; set; }
        public string Status { get; set; }
        public string Bio { get; set; }
        public DateTime? RegDate { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<Person, UserDto>()
                   .ForMember(d => d.RegDate, opt => opt.MapFrom(u => u.CreatedAt))
                   .ForMember(d => d.Picture, 
                   opt => opt.MapFrom(u => string.IsNullOrEmpty(u.Picture) ? "avatars/noavatar.png" 
                   : Path.Join("resources", "avatars", u.Picture))
                   );
            //     .ForMember(d => d.Creator, opt => opt.MapFrom(s => s.Creator.NickName));
        }
    }
}