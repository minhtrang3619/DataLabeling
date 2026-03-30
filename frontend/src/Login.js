import React, { useState } from 'react';

function Login() {
  // 1. Khai báo State để quản lý dữ liệu nhập vào
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Hàm xử lý khi nhấn nút Đăng nhập
  const handleLogin = async (event) => {
    event.preventDefault(); // Ngăn trình duyệt tải lại trang

    const loginPayload = {
      email: email,
      password: password
    };

    console.log("Dữ liệu gửi đến API:", loginPayload);

    try {
      // 3. Thực hiện gửi yêu cầu (Request) đến API xác thực
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Đăng nhập thành công!");
        // Ở đây bạn có thể thêm logic lưu Token hoặc chuyển hướng trang
      } else {
        alert("Lỗi: " + (result.message || "Thông tin không chính xác"));
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Hiện chưa kết nối được với Server Backend.");
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="email" 
            placeholder="Email" 
            style={{ width: '100%', padding: '8px' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input 
            type="password" 
            placeholder="Mật khẩu" 
            style={{ width: '100%', padding: '8px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Gửi thông tin
        </button>
      </form>
    </div>
  );
}

export default Login;