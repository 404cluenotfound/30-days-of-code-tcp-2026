class Solution {
public:
    long long time(vector<int>& piles, int k){
        long long total = 0;
        vector<int> temp = piles;
        for(int i = 0; i < temp.size(); i++){
            temp[i] = (piles[i] + k - 1) / k;
            total += temp[i];
        }
        return total;
    }

    int minEatingSpeed(vector<int>& piles, int h) {
        int left = 1;
        int right = *max_element(piles.begin(), piles.end());
        while(left < right){
            int mid = (left + right)/2;
            if(time(piles, mid) <= (long long)h){
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
};
