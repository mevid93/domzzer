namespace SlaveAPI.Profiles
{
    using AutoMapper;
    using SlaveAPI.DTOs;
    using SlaveAPI.Models;

    public class VulnerabilitiesProfile : Profile
    {
        public VulnerabilitiesProfile()
        {
            // source --> target
            CreateMap<Vulnerability, VulnerabilityReadDTO>();
            CreateMap<VulnerabilityCreateDTO, Vulnerability>();
        }
    }
}