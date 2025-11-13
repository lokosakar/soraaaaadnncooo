// src/components/CompanyProfile.jsx
import React from 'react';
import { Card, Typography, Divider, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function CompanyProfile() {
  return (
    <div style={{ padding: '40px 80px', background: '#fafafa' }}>
      <Card bordered={false} style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img src="/logo.png" alt="Logo" style={{ height: 80 }} />
          <Title level={2} style={{ marginTop: 16 }}>PT. SORA & CO.</Title>
          <Text type="secondary">“Fashion for Every Story”</Text>
        </div>

        <Divider>About Us</Divider>
        <Paragraph>
          PT. SORA & CO. berdiri pada 22 Juni 2025 dengan semangat menghadirkan fashion yang inklusif, 
          nyaman, dan berkualitas bagi semua kalangan. Kami percaya setiap individu memiliki cerita unik, 
          dan fashion adalah cara terbaik untuk mengekspresikannya.
        </Paragraph>

        <Paragraph>
          SORA & CO. menawarkan produk bergaya minimalis-elegan yang memadukan unsur klasik dan modern, 
          menjunjung tinggi kebebasan berekspresi, serta kolaborasi kreatif antara desainer, pelanggan, 
          dan komunitas.
        </Paragraph>

        <Divider>Visi & Misi</Divider>
        <Title level={5}>Visi</Title>
        <Paragraph>
          Menjadi usaha dagang fashion terdepan yang menyediakan produk tren kekinian dengan harga 
          terjangkau, kualitas terpercaya, dan pelayanan terbaik.
        </Paragraph>

        <Title level={5}>Misi</Title>
        <ul>
          <li>Menyediakan berbagai pilihan fashion terkini dari supplier terpercaya.</li>
          <li>Menjalin kerja sama jangka panjang dengan vendor kredibel.</li>
          <li>Memberikan pelayanan cepat, ramah, dan profesional.</li>
          <li>Mengembangkan pemasaran digital kreatif dan efisien.</li>
        </ul>

        <Divider>Core Values</Divider>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}><Card size="small">Integrity</Card></Col>
          <Col xs={24} sm={12} md={8}><Card size="small">Inclusivity</Card></Col>
          <Col xs={24} sm={12} md={8}><Card size="small">Innovation</Card></Col>
          <Col xs={24} sm={12} md={8}><Card size="small">Quality</Card></Col>
          <Col xs={24} sm={12} md={8}><Card size="small">Sustainability</Card></Col>
        </Row>

        <Divider>Kontak</Divider>
        <Paragraph>
          📍 Jl. Badila II, Tangki, Taman Sari, Kota Jakarta Barat, DKI Jakarta 11170<br/>
          ☎️ 0813-8820-8867<br/>
          📧 soraandco.official@gmail.com<br/>
          IG: <a href="#">SORA&Co.official</a> | TikTok: <a href="#">soraandco.official</a>
        </Paragraph>

        <Divider />
        <Paragraph style={{ textAlign: 'center', fontStyle: 'italic' }}>
          “Setiap orang punya cerita. SORA & CO. menjadikannya nyata lewat Fashion for Every Story.”
        </Paragraph>
      </Card>
    </div>
  );
}
