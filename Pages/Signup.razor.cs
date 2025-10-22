using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System;
using System.Threading.Tasks;

namespace CleanzorApp.Pages
{
    // C# Model for the data returned from the JavaScript function
    // This should ideally be in a separate Models folder, but is included here for completeness.
        public class JsAuthResponse
    {
        public bool Success { get; set; }
        public string? Uid { get; set; }
        public string? ErrorCode { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public partial class Signup
    {
        // Injected service for JavaScript Interop
        [Inject] private IJSRuntime JS { get; set; } = default!;

        // Properties bound to form inputs (as per your previous code)
        private string txtfullname { get; set; } = "";
        private string txtemail { get; set; } = "";
        private string txtusername { get; set; } = "";
        private string txtpassword { get; set; } = "";
        private string txtcpassword { get; set; } = ""; // Confirm Password
        private string txtmessage { get; set; } = ""; // For displaying messages to the user

        private async Task HandleValidSubmit()
        {
            // 1. Local C# Validation
            if (txtpassword != txtcpassword)
            {
                txtmessage = "Error: Passwords do not match.";
                return;
            }

            try
            {
                var result = await JS.InvokeAsync<JsAuthResponse>(
                    "signupUser",
                    txtemail,
                    txtpassword
                );

                if (result.Success)
                {
                    txtmessage = $"Success! User registered. UID: {result.Uid}";
                    Console.WriteLine(txtmessage);
                }
                else
                {
                    txtmessage = $"Signup Failed: {result.ErrorMessage} ({result.ErrorCode})";
                    Console.Error.WriteLine(txtmessage);
                }
            }
            catch (Exception ex)
            {
                txtmessage = "A critical system error occurred during signup.";
                Console.Error.WriteLine($"Critical Error during JS Interop: {ex.Message}");
            }
        }
    }
}