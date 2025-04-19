class HomeFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val view = inflater.inflate(R.layout.fragment_home, container, false)

        // Setup ViewPager for hero section
        val viewPager = view.findViewById<ViewPager2>(R.id.heroViewPager)
        val adapter = HeroSliderAdapter()
        viewPager.adapter = adapter

        // Setup stats section
        setupStats(view)

        return view
    }

    private fun setupStats(view: View) {
        // Initialize stats views with animations
        val studentsCount = view.findViewById<TextView>(R.id.studentsCount)
        val teachersCount = view.findViewById<TextView>(R.id.teachersCount)
        
        // Animate counting up
        animateCounter(studentsCount, 1000)
        animateCounter(teachersCount, 50)
    }

    private fun animateCounter(textView: TextView, finalValue: Int) {
        val animator = ValueAnimator.ofInt(0, finalValue)
        animator.duration = 1000
        animator.addUpdateListener { animation ->
            textView.text = animation.animatedValue.toString()
        }
        animator.start()
    }
} 