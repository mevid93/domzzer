namespace SlaveAPI.Controllers
{
    using System.Collections.Generic;
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using SlaveAPI.Data;
    using SlaveAPI.DTOs;
    using SlaveAPI.Models;

    [Route("api/[controller]")]
    [ApiController]
    public class VulnerabilitiesController : ControllerBase
    {
        private readonly IVulnerabilityRepository repository;
        private readonly IMapper mapper;

        public VulnerabilitiesController(IVulnerabilityRepository repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        // GET api/vulnerabilities
        [HttpGet]
        public ActionResult<IEnumerable<VulnerabilityReadDTO>> GetAllVulnerabilities()
        {
            var vulnerabilities = repository.GetAllVulnerabilities();
            return Ok(mapper.Map<IEnumerable<VulnerabilityReadDTO>>(vulnerabilities));
        }

        // GET api/vulnerabilities/{id}
        [HttpGet("{id:int}", Name="GetVulnerabilityById")]
        public ActionResult<IEnumerable<VulnerabilityReadDTO>> GetVulnerabilityById(int id)
        {
            var vulnerability = repository.GetVulnerabilityById(id);

            if (vulnerability != null)
            {
                return Ok(mapper.Map<VulnerabilityReadDTO>(vulnerability));
            }

            return NotFound();
        }

        // DELETE api/vulnerablities/{id}
        [HttpDelete("{id:int}")]
        public ActionResult<VulnerabilityReadDTO> DeleteVulnerabilityById(int id)
        {
            var vulnerability = repository.DeleteVulnerabilityById(id);

            if (vulnerability != null)
            {
                repository.SaveChanges();
                return Ok(mapper.Map<VulnerabilityReadDTO>(vulnerability));
            }

            return NotFound();
        }

        // POST api/vulnerabilities
        [HttpPost]
        public ActionResult<VulnerabilityCreateDTO> CreateVulnerability(VulnerabilityCreateDTO vulnerabilityCreateDTO)
        {
            var vulnerabilityModel = mapper.Map<Vulnerability>(vulnerabilityCreateDTO);
            vulnerabilityModel.Timestamp = System.DateTime.Now;

            repository.CreateVulnerability(vulnerabilityModel);
            repository.SaveChanges();

            var vulnerabilityReadDTO = mapper.Map<VulnerabilityReadDTO>(vulnerabilityModel);

            return CreatedAtRoute(nameof(GetVulnerabilityById), new { Id = vulnerabilityReadDTO.Id }, vulnerabilityReadDTO);
        }
    }
}