import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Logger, AutoDescriptor } from '@server/modules/logger/logger.service'
import { DataBaseService, WindowsService } from '@server/modules/database/database.service'
import { OmixRequest } from '@server/interface'
import { isEmpty, isNotEmpty } from 'class-validator'
import { faker } from '@server/utils'
import * as schema from '@server/modules/database/schema'
import * as enums from '@server/modules/database/enums'
import * as windows from '@web-windows-server/interface'

@Injectable()
export class AccountService extends Logger {
    constructor(
        private readonly database: DataBaseService,
        private readonly windowsService: WindowsService
    ) {
        super()
    }

    /**新增账号**/
    @AutoDescriptor
    public async httpBaseSystemCreateAccount(request: OmixRequest, body: windows.CreateAccountOptions) {
        const ctx = await this.database.fetchConnectTransaction()
        try {
            // await this.database.fetchConnectBuilder(this.windowsService.account, async qb => {
            //     qb.where(`t.number = :number OR t.phone = :phone`, { number: body.number, phone: body.phone })
            //     return await qb.getOne().then(async node => {
            //         if (isNotEmpty(node) && node.number == body.number) {
            //             throw new HttpException(`number:${body.name} 已存在`, HttpStatus.BAD_REQUEST)
            //         } else if (isNotEmpty(node) && node.phone == body.phone) {
            //             throw new HttpException(`phone:${body.name} 已存在`, HttpStatus.BAD_REQUEST)
            //         }
            //         return node
            //     })
            // })
            // await this.database.fetchConnectCreate(ctx.manager.getRepository(schema.WindowsAccount), {
            //     deplayName: this.deplayName,
            //     request,
            //     body: body
            // })
            const list = [
                1, 3, 4, 5, 9, 10, 17, 25, 27, 29, 32, 35, 36, 41, 48, 51, 55, 57, 60, 77, 97, 101, 125, 127, 134, 194, 195, 221, 226, 252,
                263, 280, 302, 309, 312, 324, 325, 334, 343, 358, 432, 453, 457, 461, 463, 474, 483, 498, 562, 564, 573, 580, 590, 606, 608,
                609, 620, 624, 648, 656, 662, 674, 676, 678, 683, 697, 705, 713, 718, 723, 724, 734, 738, 741, 755, 758, 762, 786, 795, 827,
                828, 855, 873, 875, 892, 904, 909, 921, 926, 927, 931, 955, 958, 959, 969, 972, 984, 996, 998, 1004, 1006, 1017, 1024, 1026,
                1032, 1036, 1042, 1045, 1050, 1051, 1056, 1086, 1087, 1092, 1097, 1101, 1108, 1111, 1114, 1115, 1116, 1124, 1130, 1131,
                1132, 1141, 1162, 1163, 1165, 1170, 1182, 1183, 1184, 1194, 1198, 1205, 1222, 1225, 1230, 1233, 1234, 1239, 1262, 1266,
                1269, 1279, 1280, 1284, 1287, 1291, 1296, 1297, 1301, 1310, 1312, 1313, 1321, 1339, 1344, 1345, 1353, 1357, 1360, 1362,
                1363, 1364, 1371, 1379, 1382, 1384, 1387, 1389, 1390, 1391, 1393, 1401, 1402, 1404, 1416, 1419, 1420, 1425, 1434, 1443,
                1446, 1447, 1454, 1455, 1460, 1463, 1467, 1469, 1473, 1478, 1481, 1482, 1484, 1486, 1504, 1506, 1507, 1515, 1520, 1523,
                1537, 1553, 1554, 1557, 1560, 1562, 1565, 1567, 1568, 1571, 1575, 1577, 1579, 1585, 1588, 1590, 1592, 1595, 1601, 1608,
                1613, 1614, 1617, 1619, 1621, 1622, 1624, 1628, 1629, 1630, 1642, 1644, 1645, 1649, 1653, 1666, 1668, 1679, 1681, 1685,
                1693, 1706, 1715, 1720, 1725, 1728, 1732, 1738, 1742, 1744, 1746, 1755, 1763, 1769, 1774, 1776, 1778, 1781, 1805, 1814,
                1819, 1821, 1822, 1825, 1853, 1855, 1856, 1863, 1865, 1866, 1871, 1872, 1883, 1889, 1890, 1897, 1900, 1906, 1907, 1910,
                1912, 1913, 1918, 1919, 1920, 1923, 1926, 1928, 1929, 1931, 1937, 1942, 1944, 1955, 1959, 1967, 1974, 1991, 1995, 2007,
                2009, 2018, 2053, 2056, 2062, 2085, 2089, 2090, 2108, 2111, 2149, 2151, 2164, 2168, 2170, 2176, 2182, 2186, 2206, 2207,
                2210, 2212, 2216, 2218, 2219, 2238, 2243, 2245, 2248, 2252, 2253, 2256, 2276, 2279, 2289, 2290, 2293, 2297, 2304, 2321,
                2322, 2323, 2326, 2329, 2339, 2356, 2363, 2366, 2368, 2371, 2373, 2374, 2376, 2377, 2382, 2383, 2387, 2388, 2394, 2395,
                2401, 2402, 2404, 2407, 2408, 2414, 2418, 2421, 2422, 2425, 2429, 2430, 2431, 2432, 2434, 2435, 2438, 2439, 2440, 2441,
                2445, 2447, 2448, 2451, 2461, 2464, 2467, 2471, 2472, 2473, 2474, 2475, 2477, 2479, 2480, 2483, 2485, 2486, 2488, 2493,
                2496, 2497, 2503, 2507, 2509, 2510, 2511, 2514, 2515, 2516, 2517, 2518, 2519, 2521, 2522, 2523, 2528, 2529, 2530, 2531,
                2532, 2533, 2534, 2537, 2539, 2541, 2542, 2545, 2547, 2552, 2555, 2560, 2562, 2564, 2567, 2569, 2571, 2575, 2577, 2578,
                2579, 2583, 2587, 2588, 2591, 2593, 2598, 2600, 2603, 2608, 2609, 2616, 2618, 2619, 2620, 2628, 2629, 2631, 2632, 2633,
                2634, 2635, 2650, 2651, 2656, 2660, 2661, 2663, 2667, 2671, 2676, 2678, 2681, 2682, 2686, 2687, 2690, 2692, 2693, 2694,
                2695, 2698, 2702, 2704, 2705, 2706, 2708, 2710, 2711, 2712, 2713, 2714, 2715, 2716, 2721, 2724, 2727, 2729, 2732, 2734,
                2740, 2741, 2742, 2743, 2745, 2747, 2749, 2751, 2753, 2754, 2756, 2757, 2758, 2764, 2765, 2766, 2767, 2770, 2772, 2773,
                2776, 2777, 2780, 2781, 2782, 2783, 2784, 2787, 2788, 2789, 2791, 2793, 2794, 2796, 2798, 2802, 2803, 2804, 2805, 2807,
                2810, 2811, 2812, 2813, 2814, 2816, 2817, 2821, 2822, 2825, 2826, 2827, 2828, 2829, 2830, 2833, 2834, 2835, 2836, 2837,
                2840, 2843, 2844, 2845, 2846, 2847, 2848, 2849, 2851, 2854, 2855, 2856, 2857, 2859, 2863, 2865, 2867, 2868, 2869, 2870,
                2871, 2872, 2873, 2876, 2877, 2878, 2882, 2883, 2884, 2885, 2886, 2887, 2888, 2889, 2890, 2891, 2892, 2893, 2894, 2895,
                2896, 2897, 2898, 2899, 2901, 2902, 2903, 2904, 2905, 2906, 2908, 2909, 2910, 2911, 2912, 2913, 2914, 2915, 2917, 2918,
                2919, 2920, 2924, 2925, 2927, 2928, 2929, 2930, 2931, 2932, 2934, 2935, 2936, 2937, 2938, 2939, 2940, 2942, 2943, 2946,
                2947, 2948, 2949, 2950, 2951, 2952, 2953, 2954, 2955, 2956, 2957, 2958, 2959, 2960, 2961, 2962, 2963, 2964, 2965, 2966,
                2967, 2968
            ].map(id => {
                return {
                    number: String(id).padStart(4, '0'),
                    name: faker.person.fullName(),
                    password: 'MTIzNDU2',
                    email: faker.internet.email({ provider: 'nqmo.com' }),
                    status: enums.COMMON_WINDOWS_ACCOUNT.status.online.value,
                    avatar: faker.image.avatarLegacy()
                }
            })

            // body: {
            //         number: '1234',
            //         name: '妖雨纯',
            //         password: 'MTIzNDU2',
            //         phone: '18676361342',
            //         email: 'limvcfast@gmail.com',
            //         status: enums.COMMON_WINDOWS_ACCOUNT.status.online.value,
            //         avatar: `https://static-legacy.dingtalk.com/media/lADPBFf_9uBugJXNBDjNBDg_1080_1080.jpg`
            //     }
            // return await ctx.commitTransaction().then(async () => {
            //     return await this.fetchResolver({ message: '新增成功' })
            // })

            return await this.fetchResolver({ message: '新增成功' })
        } catch (err) {
            return await this.fetchCatchRollback(this.deplayName, err, ctx)
        } finally {
            await ctx.release()
        }
    }

    /**账号列表**/
    @AutoDescriptor
    public async httpBaseSystemColumnAccount(request: OmixRequest, body: windows.ColumnAccountOptions) {}

    /**编辑账号状态**/
    @AutoDescriptor
    public async httpBaseSystemUpdateSwitchAccount(request: OmixRequest, body: windows.UpdateSwitchAccountOptions) {}
}
