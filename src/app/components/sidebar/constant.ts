export interface IMenuItem {
  title: string;
  icon?: string;
  link?: string;
  badge?: string;
  children?: IMenuItem[];
}

export const menuItems = [
  {
    title: 'Trang chủ',
    icon: 'bi bi-geo-alt',
    badge: '',
  },
  {
    title: 'Danh sách món ăn',
    icon: 'bi bi-geo-alt',
    badge: '',
    link: '/manager'
    // children: [
    //   { title: 'Món ăn', link: '/manager' },
    //   { title: 'Danh sách bán chạy', link: '/api2' }
    // ]
  },
  {
    title: 'Tạo đơn',
    icon: 'bi bi-box',
    badge: '',
    link: '/list-table'
    // children: [
    //   { title: 'Tạo đơn sử dụng địa chỉ ID', link: '/create-id' },
    //   { title: 'Tạo đơn sử dụng địa chỉ chi tiết', link: '/create-detail' }
    // ]
  }
];