namespace SlaveAPI.Tests.Controllers.Tests
{
    using Xunit;
    using SlaveAPI.Controllers;
    using SlaveAPI.Data;
    using SlaveAPI.DTOs;
    using SlaveAPI.Models;
    using SlaveAPI.Profiles;
    using System;
    using AutoMapper;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;

    public class VulnerabilitiesControllerTests
    {
        private readonly VulnerabilitiesController vulnerabilitiesController;
        private IVulnerabilityRepository vulnerabilityRepository;
        private readonly IMapper mapper;

        public VulnerabilitiesControllerTests()
        {
            this.vulnerabilityRepository = new MockVulnerabilityRepository();
            //auto mapper configuration
            var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new VulnerabilitiesProfile());
            });
            this.mapper = mapperConfiguration.CreateMapper();
            this.vulnerabilitiesController = new VulnerabilitiesController(this.vulnerabilityRepository, this.mapper);
        }

        private void InitializeTestEnvironment()
        {
            // clear existing data
            this.vulnerabilityRepository.GetAllVulnerabilities();
            List<Vulnerability> vulnerabilities = (List<Vulnerability>)this.vulnerabilityRepository.GetAllVulnerabilities();
            foreach (var v in vulnerabilities)
            {
                this.vulnerabilityRepository.DeleteVulnerabilityById(v.Id);
            }

            // add default data
            vulnerabilityRepository.CreateVulnerability(new Vulnerability(1, "chrome", DateTime.MinValue, "<html>hacked1</html>"));
            vulnerabilityRepository.CreateVulnerability(new Vulnerability(2, "mozilla", DateTime.MinValue, "<html>hacked2</html>"));
            vulnerabilityRepository.CreateVulnerability(new Vulnerability(3, "safari", DateTime.MinValue, "<html>hacked3</html>"));
        }

        [Fact]
        public void VulnerabilitiesController_returns_all_vulnerabilities()
        {
            // Arrange
            this.InitializeTestEnvironment();

            // Act
            var result = this.vulnerabilitiesController.GetAllVulnerabilities();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okResult.StatusCode);

            List<VulnerabilityReadDTO> vulnerabilities = okResult.Value as List<VulnerabilityReadDTO>;
            Assert.Equal(3, vulnerabilities.Count);
            Assert.Equal("chrome", vulnerabilities[0].TargetBrowser);
        }

        [Fact]
        public void VulnerabilitiesController_returns_single_vulnerability_when_id_is_valid()
        {
            // Arrange
            this.InitializeTestEnvironment();

            // Act
            var result = this.vulnerabilitiesController.GetVulnerabilityById(3);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okResult.StatusCode);

            VulnerabilityReadDTO vulnerability = okResult.Value as VulnerabilityReadDTO;
            Assert.Equal("safari", vulnerability.TargetBrowser);
        }

        [Fact]
        public void VulnerabilitiesController_does_not_return_vulnerability_when_id_does_not_exist()
        {
            // Arrange
            this.InitializeTestEnvironment();

            // Act
            var result = this.vulnerabilitiesController.GetVulnerabilityById(404);

            // Assert
            var okResult = Assert.IsType<NotFoundResult>(result.Result);
            Assert.Equal(404, okResult.StatusCode);
        }

        [Fact]
        public void VulnerabilitiesController_deletes_vulnerability_when_id_does_exist()
        {
            // Arrange
            this.InitializeTestEnvironment();

            // Act
            var result = this.vulnerabilitiesController.DeleteVulnerabilityById(2);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(200, okResult.StatusCode);

            VulnerabilityReadDTO vulnerability = okResult.Value as VulnerabilityReadDTO;
            Assert.Equal("mozilla", vulnerability.TargetBrowser);

            List<Vulnerability> vulnerabilities = (List<Vulnerability>)this.vulnerabilityRepository.GetAllVulnerabilities();
            Assert.True(vulnerabilities.Find(x => x.Id == 2) == null);
        }

        [Fact]
        public void VulnerabilitiesController_does_not_delete_vulnerability_when_id_does_not_exist()
        {
            // Arrange
            this.InitializeTestEnvironment();

            // Act
            var result = this.vulnerabilitiesController.DeleteVulnerabilityById(666);

            // Assert
            var okResult = Assert.IsType<NotFoundResult>(result.Result);
            Assert.Equal(404, okResult.StatusCode);

            List<Vulnerability> vulnerabilities = (List<Vulnerability>)this.vulnerabilityRepository.GetAllVulnerabilities();
            Assert.Equal(3, vulnerabilities.Count);
        }

        [Fact]
        public void VulnerabilitiesController_creates_vulnerability_when_data_is_valid()
        {
            // Arrange
            this.InitializeTestEnvironment();

            // Act
            VulnerabilityCreateDTO newVulnerability = new VulnerabilityCreateDTO
            {
                TargetBrowser = "edge",
                Payload = "<html>hacked4</html>"
            };
            var result = this.vulnerabilitiesController.CreateVulnerability(newVulnerability);

            // Assert
            var okResult = Assert.IsType<CreatedAtRouteResult>(result.Result);
            Assert.Equal(201, okResult.StatusCode);

            VulnerabilityReadDTO vulnerability = okResult.Value as VulnerabilityReadDTO;
            Assert.Equal(4, vulnerability.Id);

            List<Vulnerability> vulnerabilities = (List<Vulnerability>)this.vulnerabilityRepository.GetAllVulnerabilities();
            Assert.Equal(4, vulnerabilities.Count);
        }
    }
}
