﻿using ASP.NET5.MVC.WEBPACK.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace ASP.NET5.MVC.WEBPACK.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult DataTables()
        {
            ViewData["Message"] = "Demo DataTables jquery bootsrap 3.";

            return View();
        }

        public IActionResult Fancybox()
        {
            ViewData["Message"] = "Demo Fancybox.";

            return View();
        }
        public IActionResult BootstrapMultiselect()
        {
            ViewData["Message"] = "Demo BootstrapMultiselect.";

            return View();
        }

        public IActionResult Fontawesome()
        {
            ViewData["Message"] = "Demo Fontawesome.";

            return View();
        }
        public IActionResult Daterangepicker()
        {
            ViewData["Message"] = "Demo Daterangepicker.";

            return View();
        }
        public IActionResult BootstrapSteps()
        {
            ViewData["Message"] = "Demo BootstrapSteps.";

            return View();
        }

        public IActionResult Sweetalert2()
        {
            ViewData["Message"] = "Demo Sweetalert2.";

            return View();
        }

        public IActionResult Toastr()
        {
            ViewData["Message"] = "Demo Toastr.";

            return View();
        }

        public IActionResult SerializeQueryParams()
        {
            ViewData["Message"] = "Demo SerializeQueryParams.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
