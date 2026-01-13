class Solution {
  public:
    int setBits(int n) {
        int m = 0;
        while (n > 0){
            int t = n % 2;
            m += t;
            n = n/2;
        }
        return m;
    }
};