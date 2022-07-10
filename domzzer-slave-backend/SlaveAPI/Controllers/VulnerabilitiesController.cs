using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SlaveAPI.Context;
using SlaveAPI.DTOs;
using SlaveAPI.Models;

namespace SlaveAPI.Controllers
{

    [Authorize]
    [Route("api/vulnerabilities")]
    [ApiController]
    public class VulnerabilitiesController : ControllerBase
    {
        private readonly SlaveAPIContext _slaveAPIContext;
        private readonly IMapper _mapper;

        public VulnerabilitiesController(SlaveAPIContext slaveAPIContext, IMapper mapper)
        {
            _slaveAPIContext = slaveAPIContext;
            _mapper = mapper;
        }

        // GET api/vulnerabilities
        [HttpGet]
        public ActionResult<List<Vulnerability>> GetAllVulnerabilities()
        {
            var vulnerabilities = _slaveAPIContext.Vulnerabilities;
            return Ok(vulnerabilities);
        }

        // GET api/vulnerabilities/{id}
        [HttpGet("{id:int}", Name="GetVulnerabilityById")]
        public ActionResult<Vulnerability> GetVulnerabilityById(int id)
        {
            var vulnerability = _slaveAPIContext.Vulnerabilities.FirstOrDefault(v => v.Id == id);

            if (vulnerability != null)
            {
                return Ok(vulnerability);
            }

            return NotFound();
        }

        // DELETE api/vulnerablities/{id}
        [HttpDelete("{id:int}")]
        public ActionResult DeleteVulnerabilityById(int id)
        {
            var vulnerability = _slaveAPIContext.Vulnerabilities.FirstOrDefault(v => v.Id == id);

            if (vulnerability != null)
            {
                _slaveAPIContext.Vulnerabilities.Remove(vulnerability);
                _slaveAPIContext.SaveChanges();
                return NoContent();
            }

            return NotFound();
        }

        // POST api/vulnerabilities
        [HttpPost]
        public ActionResult<Vulnerability> CreateVulnerability(VulnerabilityDTO vulnerabilityDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var vulnerability = _mapper.Map<Vulnerability>(vulnerabilityDTO);
            vulnerability.Timestamp = System.DateTime.Now;
            _slaveAPIContext.Vulnerabilities.Add(vulnerability);
            _slaveAPIContext.SaveChanges();

            return CreatedAtRoute(nameof(GetVulnerabilityById), new { Id = vulnerability.Id }, vulnerability);
        }
    }
}