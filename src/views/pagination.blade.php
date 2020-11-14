@if ($paginator->hasPages())
	<nav class="laravel-pagination margin-y-6">
		{{-- Prev Btn --}}
		@if (!$paginator->onFirstPage())
			<a href="{{ $paginator->previousPageUrl() }}">
				<i class="material-icons">keyboard_arrow_left</i>
			</a>
		@endif

		{{-- Pages --}}
		@foreach ($elements as $elm)
			@if (is_array($elm))
				@foreach ($elm as $page => $url)
					@if ($page == $paginator->currentPage())
						<span id="curPage">{{ $page }}</span>
					@else
						<a href="{{ $url }}">{{ $page }}</a>
					@endif
				@endforeach
			@else
				<span>{{ $elm }}</span>
			@endif
		@endforeach

		{{-- Next Btn --}}
		@if ($paginator->hasMorePages())
			<a href="{{ $paginator->nextPageUrl() }}">
				<i class="material-icons">keyboard_arrow_right</i>
			</a>
		@endif
	</nav>
@endif
