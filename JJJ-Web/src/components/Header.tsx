// 박용재
import styles from "../styles/components/Header.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import LogoImg from "../assets/images/logo.png";
import { useEffect, useState } from "react";
import { FixedStore } from "../stores/Fixed.store";

interface IPages {
  [key: string]: string;
}

interface User {
  userName: string | null;
}

const links: string[] = [
  "category/gift",
  "category/intelligence",
  "category/fiveSenses",
  "category/emotion",
  "category/society",
  "usedProductList",
];

const pages: IPages = {
  "category/gift": "선물",
  "category/intelligence": "지능발달",
  "category/fiveSenses": "오감발달",
  "category/emotion": "정서발달",
  "category/society": "사회발달",
  usedProductList: "중고상품",
};



export default function Header() {
  const navigate = useNavigate();
  const { isFixed, setIsFixed } = FixedStore();
  const [user, setUser] = useState<User>({ userName: null });

  const handleScroll = () => {
    if (window.scrollY > 79) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // 서버에서 로그인 된 사용자의 이름 가져오기
    // 이름이 없으면 원래대로 로그인, 회원가입 활성화
    const loginUserName = "신승주";
    // 예시 사용자 ID
    setUser({ userName: loginUserName });
  }, []);

  return (
    <header className={`${styles.header} ${isFixed ? styles.fixed : ""}`}>
      {!isFixed && <Logo />}
      <nav className={styles.nav}>
        {isFixed && <Logo />}
        <ul className={styles.nav__category}>
          {links.map((link) => (
            <NavLink
              key={link}
              to={`/${link}`}
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ""}`
              }
            >
              {pages[link]}
            </NavLink>
          ))}
        </ul>

        <ul className={styles.nav__icons}>
          <li onClick={() => navigate("/Search")}>
            <SearchIcon sx={{ fontSize: "var(--font-size-large)" }} />
          </li>
          <li onClick={() => navigate("/Mypage")}>
            <PermIdentityOutlinedIcon
              sx={{ fontSize: "var(--font-size-large)" }}
            />
          </li>
          <li onClick={() => navigate("/Cart")}>
            <ShoppingBagOutlinedIcon
              sx={{ fontSize: "var(--font-size-large)" }}
            />
          </li>

          {/* nav__icons 안의 nav__auto에 absolute 적용 */}
          {user.userName ? (
            <ul className={styles.login__auth}>{user.userName}님 안녕하세요!</ul>
          ) : (
            <ul className={styles.nav__auth}>
              <li onClick={() => navigate("/signIn")}>로그인</li>
              <li onClick={() => navigate("/signUp")}>회원가입</li>
            </ul>
          )}

          {/* <ul className={styles.nav__auth}>
            <li onClick={() => navigate('/signIn')}>로그인</li>
            <li onClick={() => navigate('/signUp')}>회원가입</li>
          </ul> */}
        </ul>
      </nav>
    </header>
  );
}

export function Logo() {
  const navigate = useNavigate();
  return (
    <div className={styles.logo__container}>
      <img
        className={styles.logo__img}
        src={LogoImg}
        alt="Logo"
        onClick={() => navigate("/")}
      />
    </div>
  );
}
