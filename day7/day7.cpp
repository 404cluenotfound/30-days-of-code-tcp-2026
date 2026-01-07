class Solution {
public:
    int sumOfEncryptedInt(vector<int>& nums) {
        int total = 0;

        for (int x : nums) {
            int temp = x;

            int mx = 0;
            int digits = 0;
            while (temp > 0) {
                int d = temp % 10;
                mx = max(mx, d);
                digits++;
                temp /= 10;
            }
            int ones = 0;
            for (int i = 0; i < digits; i++) {
                ones = ones * 10 + 1;
            }
            int enc = mx * ones;
            total += enc;
        }
        return total;
    }
};
