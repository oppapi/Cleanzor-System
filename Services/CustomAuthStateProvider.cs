using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.JSInterop;
using System.Threading.Tasks;

public class CustomAuthStateProvider : AuthenticationStateProvider
{
    private readonly IJSRuntime _js;
    private readonly ClaimsPrincipal _anonymous = new ClaimsPrincipal(new ClaimsIdentity());

    public CustomAuthStateProvider(IJSRuntime js)
    {
        _js = js;
    }

    public override async Task<AuthenticationState> GetAuthenticationStateAsync()
    {
        try
        {
            // Wait for the JS interop to return the current Firebase user email (or null).
            var email = await _js.InvokeAsync<string>("getFirebaseUserEmail");

            if (!string.IsNullOrEmpty(email))
            {
                var identity = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, email)
                }, "Firebase");

                var user = new ClaimsPrincipal(identity);
                return new AuthenticationState(user);
            }
        }
        catch
        {
            // ignore errors and fall through to anonymous
        }

        return new AuthenticationState(_anonymous);
    }

    public void NotifyUserChanged(string? email)
    {
        ClaimsPrincipal user;

        if (!string.IsNullOrEmpty(email))
        {
            var identity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, email)
            }, "Firebase");

            user = new ClaimsPrincipal(identity);
        }
        else
        {
            user = _anonymous;
        }

        NotifyAuthenticationStateChanged(Task.FromResult(new AuthenticationState(user)));
    }
}