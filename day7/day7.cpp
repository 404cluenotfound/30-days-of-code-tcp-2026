class Solution {
public:
    int sumOfEncryptedInt(vector<int>& nums) {
        int total = 0;

        for (int i : nums) {
            int y = i;

            int max = 0;
            int digits = 0;
            while (y > 0) {
                max = max(max, y%10);
                digits++;
                y /= 10;
            }
            int ones = 0;
            for (int j = 0; j < digits; j++) {
                ones = ones * 10 + 1;
            }
            int enc = max * ones;
            total += enc;
        }
        return total;
    }
};

