//code with time complexity O(n);

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        if(nums.empty()) return 0;
        unordered_set<int> s;
        for (int x : nums){
            s.insert(x);
        }
        int longest = 0;
        for (int x : s){
            if (s.find(x-1) == s.end()){
                int u = x+1;
                while (s.find(u) != s.end()){
                    u++;
                }
                longest = max(longest,u-x);
            }
        }
        return longest;
    }
};

