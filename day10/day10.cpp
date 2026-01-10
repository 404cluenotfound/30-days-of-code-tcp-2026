class Solution {
  public:
    void sort012(vector<int>& arr) {
        int n =  arr.size();
        int a = 0 , b = 0 , c = 0;
        for ( int x : arr){
            if (x == 0) a++;
            else if (x == 1) b++;
            else c++;
        }
        for (int i = 0 ; i < n ; i++){
            if (i < a){
                arr[i] = 0;
            }
            else if (i >= a && i < a+b){
                arr[i] = 1;
            }
            else {
                arr[i] = 2;
            }
        }
    }
};