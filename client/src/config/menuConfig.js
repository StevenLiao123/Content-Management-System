const menuList = [
    {
        title: 'Home',
        key: '/home',
        icon: 'home',
        isPublic: true,
    },
    {
        title: 'Product',
        key: '/product',
        icon: 'appstore',
        children: [
            {
                title: 'Category',
                key: '/category',
                icon: 'bars',
            },
            {
                title: 'Product',
                key: '/product',
                icon: 'tool',
            },
        ],
    },
    {
        title: 'User',
        key: '/user',
        icon: 'user',
    },
    {
        title: 'Role',
        key: '/role',
        icon: 'safety',
    },
    {
        title: 'Charts',
        key: '/charts',
        icon: 'area-chart',
        children: [
            {
                title: 'Bar Chart',
                key: '/barChart',
                icon: 'bar-chart',
            },
            {
                title: 'Line Chart',
                key: '/lineChart',
                icon: 'line-chart',
            },
            {
                title: 'Pie Chart',
                key: '/pieChart',
                icon: 'pie-chart',
            },
        ],
    },
];

export default menuList;