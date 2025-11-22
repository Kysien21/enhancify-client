import { useLogIn } from "./useLogIn";

function LogIn() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  } = useLogIn();

  return (
    <main>
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex w-[390px] h-[485px] rounded-[10px] bg-[#fff]/40 backdrop-blur-md">

          <div className="flex flex-col flex-1 items-center justify-center">
            <div className="flex items-center justify-center">
              
              <div className="relative text-center">
                <h1 className="text-[35px] text-[#133970] font-[600] leading-tight">
                  WELCOME BACK
                </h1>
                <p className="text-[9px] font-medium tracking-[2px] text-[#133970]">
                  Sign in to access your dashboard
                </p>
              </div>
            </div>

            {/* Bind form to handleLogin */}
            <form
              onSubmit={handleLogin}
            >
              <label className="flex flex-col w-[260px]">
                <h2 className="text-[15px] text-[#133970] mt-5 mb-1 ml-1">
                  Email:
                </h2>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[30px] px-5 py-4 mb-4 border border-[#3b7ce9] rounded-[8px] bg-[#fbf5f5]/30 backdrop-blur-md shadow"
                />
              </label>

              <label className="flex flex-col w-[260px]">
                <h2 className="text-[15px] text-[#133970] mt-5 mb-1 ml-1">
                  Password:
                </h2>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[30px] px-5 py-4 mb-4 border border-[#3b7ce9] rounded-[8px] bg-[#fbf5f5]/30 backdrop-blur-md shadow"
                />
              </label>

              <div className="flex justify-end w-full pr-5">
                <a href="#" className="text-[9px] italic text-[#133970]">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="px-28 py-2 mt-4 text-[14px] text-white bg-[#133970] rounded-[8px] hover:bg-[#102c5d] transition"
              >
                Login
              </button>
            </form>

            <div className="flex flex-col items-center mt-4">
              <p className="text-[11px] leading-[16px] text-[#133970]">
                Not yet registered?
              </p>
              <a
                href="/signup"
                className="text-[11px] leading-[16px] text-[#133970] underline"
              >
                Sign up now
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LogIn;