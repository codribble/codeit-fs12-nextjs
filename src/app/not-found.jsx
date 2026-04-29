import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <p>
        <Link href="/">홈으로 이동</Link>
      </p>
    </div>
  );
};

export default NotFound;
