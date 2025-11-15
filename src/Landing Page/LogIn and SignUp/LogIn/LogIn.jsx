import LogoIcon from "../../../assets/Logo.png";
import GoogleIcon from "../../../assets/google.png";
import FacebookIcon from "../../../assets/facebook.png";
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
        <div className="flex w-[410px] h-[485px] rounded-[10px] bg-[#fff]/40 backdrop-blur-md overflow-hidden">
          <div className="w-[50px] bg-[#133970]/90 backdrop-blur-md" />

          <div className="flex flex-col flex-1 items-center justify-start pt-4">
            <div className="flex items-center justify-center">
              <img src={LogoIcon} alt="Logo" className="w-[112px] mt-2" />
              <div className="flex flex-col items-center relative right-[26px] top-[7px]">
                <h1 className="text-[25px] text-[#133970] font-[600] leading-tight -mb-1">
                  WELCOME BACK!
                </h1>
                <p className="text-[9px] font-medium tracking-[2px] text-[#133970]">
                  Sign in to access your dashboard
                </p>
              </div>
            </div>

            {/* Bind form to handleLogin */}
            <form
              className="relative flex flex-col items-start"
              onSubmit={handleLogin}
            >
              <label className="flex flex-col w-[260px]">
                <h2 className="text-[15px] text-[#133970] mt-3 mb-2 ml-1">
                  Email:
                </h2>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-[30px] px-4 py-1 mb-2 border border-[#3b7ce9] rounded-[8px] bg-[#fbf5f5]/30 backdrop-blur-md shadow"
                />
              </label>

              <label className="flex flex-col w-[260px]">
                <h2 className="text-[15px] text-[#133970] mt-3 mb-2 ml-1">
                  Password:
                </h2>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-[30px] px-4 py-1 mb-2 border border-[#3b7ce9] rounded-[8px] bg-[#fbf5f5]/30 backdrop-blur-md shadow"
                />
              </label>

              <div className="flex justify-end w-full pr-5">
                <a href="#" className="text-[9px] italic text-[#133970]">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-[260px] h-[27px] mt-4 text-[14px] text-white bg-[#133970] rounded-[8px] hover:bg-[#102c5d] transition"
              >
                Login
              </button>
            </form>

            <div className="flex items-center justify-center w-full px-10 my-5 text-[11px] italic text-[#133970] text-center">
              <div className="flex-1 border-b border-[#133970] mx-2" />
              <p>or login using</p>
              <div className="flex-1 border-b border-[#133970] mx-2" />
            </div>

            <div className="flex justify-center items-center gap-5 mt-1">
              <img
                src={GoogleIcon}
                alt="Google"
                className="w-[15px] h-[15px] cursor-pointer"
              />
              <img
                src={FacebookIcon}
                alt="Facebook"
                className="w-[15px] h-[15px] cursor-pointer"
              />
            </div>

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
