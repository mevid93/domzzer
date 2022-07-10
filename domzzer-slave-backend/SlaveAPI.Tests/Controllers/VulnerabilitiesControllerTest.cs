using Xunit;
using SlaveAPI.Controllers;
using SlaveAPI.Models;
using SlaveAPI.Profiles;
using System;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SlaveAPI.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using SlaveAPI.DTOs;

namespace SlaveAPI.Tests.Controllers.Tests
{

    public class VulnerabilitiesControllerTest
    {
        private readonly VulnerabilitiesController _vulnerabilitiesController;
        private readonly SlaveAPIContext _testContext;
        private readonly IMapper _mapper;

        public VulnerabilitiesControllerTest()
        {
            var dbContextOptions = new DbContextOptionsBuilder<SlaveAPIContext>().UseInMemoryDatabase("TESTDB");
            _testContext = new SlaveAPIContext(dbContextOptions.Options);

            // Auto mapper configuration
            var mapperConfiguration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new VulnerabilitiesProfile());
            });

            _mapper = mapperConfiguration.CreateMapper();
            _vulnerabilitiesController = new VulnerabilitiesController(_testContext, _mapper);
        }

        private void InitializeTestEnvironment()
        {
            var data = new List<Vulnerability>
            {
                new Vulnerability
                {
                    TargetBrowser = "chrome",
                    Timestamp = DateTime.MinValue,
                    Payload = "<html>hacked1</html>"
                },
                new Vulnerability
                {
                    TargetBrowser = "firefox",
                    Timestamp = DateTime.MinValue,
                    Payload = "<html>hacked2</html>"
                },
                new Vulnerability
                {
                    TargetBrowser = "safari",
                    Timestamp = DateTime.MinValue,
                    Payload = "<html>hacked3</html>"
                },
            }.AsQueryable();

            // Clear database and fill with default values
            _testContext.Database.EnsureDeleted();
            _testContext.Database.EnsureCreated();

            foreach (var vulnerability in data)
            {
                _testContext.Add(vulnerability);
            }

            _testContext.SaveChanges();
        }

        [Fact]
        public void GetAllVulnerabilities_Returns_AllVulnerabilities()
        {
            InitializeTestEnvironment();

            var result = _vulnerabilitiesController.GetAllVulnerabilities();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var resultValues = okResult.Value as IEnumerable<Vulnerability>;
            var vulnerabilities = resultValues.ToList();

            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal(3, vulnerabilities.Count);
            Assert.Equal("chrome", vulnerabilities[0].TargetBrowser);
        }

        [Fact]
        public void GetVulnerabilityById_ReturnsVulnerability_WhenIdIsValid()
        {
            InitializeTestEnvironment();

            var result = _vulnerabilitiesController.GetVulnerabilityById(3);

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var vulnerability = okResult.Value as Vulnerability;

            Assert.Equal(200, okResult.StatusCode);
            Assert.Equal("safari", vulnerability.TargetBrowser);
        }

        [Fact]
        public void GetVulnerabilityById_DoesNotReturnVulnerability_WhenIdDoesNotExist()
        {
            InitializeTestEnvironment();

            var result = _vulnerabilitiesController.GetVulnerabilityById(404);

            var okResult = Assert.IsType<NotFoundResult>(result.Result);
            Assert.Equal(404, okResult.StatusCode);
        }

        [Fact]
        public void DeleteVulnerabilityById_DeletesVulnerability_WhenIdIsValid()
        {
            InitializeTestEnvironment();

            var result = _vulnerabilitiesController.DeleteVulnerabilityById(2);
            var vulnerabilities = _testContext.Vulnerabilities.ToList();

            var notFoundResult = Assert.IsType<NoContentResult>(result);
            Assert.Equal(204, notFoundResult.StatusCode);
            Assert.Null(vulnerabilities.FirstOrDefault(v => v.Id == 2));
        }

        [Fact]
        public void DeleteVulnerabilityById_DoesNotDeleteVulnerability_WhenIdDoesNotExist()
        {
            InitializeTestEnvironment();

            var result = _vulnerabilitiesController.DeleteVulnerabilityById(666);
            var vulnerabilities = _testContext.Vulnerabilities.ToList();

            var okResult = Assert.IsType<NotFoundResult>(result);
            Assert.Equal(404, okResult.StatusCode);
            Assert.Equal(3, vulnerabilities.Count);
        }

        [Fact]
        public void CreateVulnerability_CreatesVulnerability_WhenDataIsValid()
        {
            InitializeTestEnvironment();

            var newVulnerability = new VulnerabilityDTO
            {
                TargetBrowser = "edge",
                Payload = "<html>hacked4</html>"
            };

            var result = _vulnerabilitiesController.CreateVulnerability(newVulnerability);
            var vulnerabilities = _testContext.Vulnerabilities.ToList();

            var okResult = Assert.IsType<CreatedAtRouteResult>(result.Result);
            Assert.Equal(201, okResult.StatusCode);
            var vulnerability = okResult.Value as Vulnerability;
            Assert.Equal(4, vulnerability.Id);
            Assert.Equal(4, vulnerabilities.Count);
        }

        [Fact]
        public void CreateVulnerability_DoesNotCreateVulnerability_WhenDataIsInvalid()
        {
            InitializeTestEnvironment();

            var newVulnerability = new VulnerabilityDTO(); // missing data --> invalid
            _vulnerabilitiesController.ModelState.AddModelError("test", "test error");
            var result = _vulnerabilitiesController.CreateVulnerability(newVulnerability);
            var vulnerabilities = _testContext.Vulnerabilities.ToList();

            var badResult = Assert.IsType<BadRequestResult>(result.Result);
            Assert.Equal(400, badResult.StatusCode);
            Assert.Equal(3, vulnerabilities.Count);
        }
    }
}
