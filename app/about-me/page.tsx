import React from 'react';
import Layout from '@/components/Layout';

const AboutMe: React.FC = () => {
  return (
    <Layout>
      <h1>About Me</h1>
      <div className="flex items-start">
        {/* Image */}
        <img
          src="https://engineer.wu.ac.th/wp-content/uploads/2019/02/LINE_ALBUM_ภาพบุคคล_๒๓๐๑๑๗_1-e1673932799937.jpg"
          alt="Author"
          className="w-48 h-auto mr-6"
        />

        {/* Details */}
        <table className="w-full text-left">
          <tbody>
            <tr>
              <td className="font-bold" colSpan={2}>อาจารย์ ดร. อาสาฬห์ชัย สุขเกื้อ</td>
            </tr>
            <tr>
              <td colSpan={2}>อาจารย์สาขาวิศวกรรมคอมพิวเตอร์และอิเล็กทรอนิกส์</td>
            </tr>
            <tr>
              <td className="font-bold align-top">ความเชี่ยวชาญ</td>
              <td>
                <div className="flex flex-col space-y-1">
                  <span>Artificial Intelligence</span>
                  <span>Image Processing and Deep Learning</span>
                  <span>Algorithms for Spatial Data Analysis</span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="font-bold">เบอร์โทรศัพท์ภายนอก</td>
              <td>0-7567-6770, 0-7567-2304-5</td>
            </tr>
            <tr>
              <td className="font-bold">เบอร์โทรศัพท์ภายใน</td>
              <td>76770, 72304-5</td>
            </tr>
            <tr>
              <td className="font-bold">E-mail</td>
              <td>arsanchai.su@wu.ac.th</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AboutMe;
