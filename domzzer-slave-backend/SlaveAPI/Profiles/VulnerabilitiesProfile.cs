using AutoMapper;
using SlaveAPI.DTOs;
using SlaveAPI.Models;

namespace SlaveAPI.Profiles
{

    public class VulnerabilitiesProfile : Profile
    {
        public VulnerabilitiesProfile()
        {
            // Source to target mapping
            CreateMap<VulnerabilityDTO, Vulnerability>();
        }
    }
}